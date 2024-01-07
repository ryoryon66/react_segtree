class SegTree {

    constructor(num_elems,op,e){
        let n = 1;
        while(n < num_elems) n *= 2;
        this.n = n;
        this.array = new Array(2*n).fill(0);
        this.is_updated = new Array(2*n).fill(false);
        this.is_used = new Array(2*n).fill(false);

        this.op = op;
        this.e = e;
    }

    reset_conditions(){
        this.is_updated = new Array(2*this.n).fill(false);
        this.is_used = new Array(2*this.n).fill(false);
    }

    update(i,val){
        this.reset_conditions();
        i += this.n;
        this.array[i] = val;
        this.is_updated[i] = true;
        while(i > 1){
            i = Math.floor(i/2);
            this.array[i] = this.op(this.array[2*i],this.array[2*i+1]);
            this.is_updated[i] = true;
        }
        // console.log(this.is_updated);
    }

    get(i){
        return this.array[i+this.n];
    }

    query(l,r,reset=true){
        // console.log("query",l,r,reset);
        if (reset) this.reset_conditions();
        return this._query(l,r,1,0,this.n);
    }

    _query(l,r,node_index,node_l,node_r){

        // console.log(r,node_l)
        if(l >= node_r || r <= node_l) return this.e;

        if(l <= node_l && node_r <= r) {
            this.is_used[node_index] = true;
            return this.array[node_index];
        }

        let mid = Math.floor((node_l+node_r)/2);
        let left_v = this._query(l,r,2*node_index,node_l,mid);
        let right_v = this._query(l,r,2*node_index+1,mid,node_r);
        return this.op(left_v,right_v);

    }
}

export default SegTree;