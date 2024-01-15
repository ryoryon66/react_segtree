class SegTree {

    constructor(num_elems,op,e,array,is_updated,is_used) {
        let n = 1;
        while(n < num_elems) n *= 2;
        this.n = n;
        this.array = array.slice();
        this.is_updated = is_updated.slice();
        this.is_used = is_used.slice();



        this.op = op;
        this.e = e;
        
    }

    change_num_elems(num_elems) {
        let n = 1;
        while(n < num_elems) n *= 2;
        let new_n = n;
        let new_array = new Array(2*n).fill(0);
        let new_is_updated = new Array(2*n).fill(false);
        let new_is_used = new Array(2*n).fill(false);

        let new_tree = new SegTree(new_n,this.op,this.e,new_array,new_is_updated,new_is_used);

        // return new_tree;

        for (let i = 0; i < new_tree.n; i++) {
            new_tree = new_tree.update(i,Math.floor(Math.random()*10 - 5));
        }

        return new SegTree(new_n,this.op,this.e,new_tree.array.slice(),new_is_updated,new_is_used);

    }

    changeOp(opcode){

        if (opcode === "add") {
            let new_op = (a,b)=>a+b;
            let new_e = 0;
            let ret_tree = new SegTree(this.n,new_op,new_e,this.array.slice(), new Array(2*this.n).fill(false),new Array(2*this.n).fill(false));

            for (let i = 0; i < this.n; i++) {
                ret_tree = ret_tree.update(i,this.array[i+this.n]);
            }

            return new SegTree(ret_tree.n,ret_tree.op,ret_tree.e,ret_tree.array,new Array(2*this.n).fill(false),new Array(2*this.n).fill(false));
        } else if (opcode === "mul") {
            let new_op = (a,b)=>a*b;
            let new_e = 1;
            let ret_tree = new SegTree(this.n,new_op,new_e,this.array.slice(), new Array(2*this.n).fill(false),new Array(2*this.n).fill(false));

            for (let i = 0; i < this.n; i++) {
                ret_tree = ret_tree.update(i,this.array[i+this.n]);
            }
            
            return new SegTree(ret_tree.n,ret_tree.op,ret_tree.e,ret_tree.array,new Array(2*this.n).fill(false),new Array(2*this.n).fill(false));
        } else if (opcode === "max") {
            let new_op = (a,b)=>Math.max(a,b);
            let new_e = -Infinity;
            let ret_tree = new SegTree(this.n,new_op,new_e,this.array.slice(), new Array(2*this.n).fill(false),new Array(2*this.n).fill(false));

            for (let i = 0; i < this.n; i++) {
                ret_tree = ret_tree.update(i,this.array[i+this.n]);
            }
            
            return new SegTree(ret_tree.n,ret_tree.op,ret_tree.e,ret_tree.array,new Array(2*this.n).fill(false),new Array(2*this.n).fill(false));
        }

        console.log("error in changeOp");

        
    }

    update(i,val){ 

        i += this.n;



        let array = this.array.slice();

        // console.log("update",i,val);
        let is_updated = new Array(2*this.n).fill(false);

        array[i] = val;
        is_updated[i] = true;
        while(i > 1){
            i = Math.floor(i/2);
            array[i] = this.op(array[2*i],array[2*i+1]);
            is_updated[i] = true;
        }

        return new SegTree(this.n,this.op,this.e,array.slice(),is_updated.slice(),new Array(2*this.n).fill(false));
        
    }

    get(i){
        return this.array[i+this.n];
    }

    query(l,r,){

        if (isNaN(l) || isNaN(r)) return [NaN,NaN];
        // console.log("query",l,r,reset);
        let is_used = new Array(2*this.n).fill(false);
        return this._query(l,r,1,0,this.n,is_used);
    }

    _query(l,r,node_index,node_l,node_r,is_used){



        // console.log(r,node_l)
        if(l >= node_r || r <= node_l) return [this.e,is_used.slice()];

        if(l <= node_l && node_r <= r) {
            // console.log("is_used",is_used);
            is_used[node_index] = true;
            // console.log("is_used",is_used);
            return [this.array[node_index],is_used.slice()];
        }

        let mid = Math.floor((node_l+node_r)/2);
        let res_left = this._query(l,r,2*node_index,node_l,mid,is_used);
        let left_v = res_left[0]
        let left_used = res_left[1];
        let res_right = this._query(l,r,2*node_index+1,mid,node_r,left_used);
        let right_v = res_right[0];
        let right_used = res_right[1];


        return [this.op(left_v,right_v),right_used]

    }
}

export default SegTree;