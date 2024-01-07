
function SegBlock(props) {

    const node_index = props.node_index;
    const segtree = props.segtree;

    if (node_index >= segtree.array.length) return null;

    let item = <div className="seg-item">
        {segtree.array[node_index]}
    </div>;

    // console.log(node_index,segtree.array[node_index]);
    // console.log(segtree.is_updated[node_index]);
    // console.log(segtree.is_updated);

    if (segtree.is_updated[node_index]) {
        item = <div className="seg-item is-updated">
            {segtree.array[node_index]}
        </div>

        console.log(node_index,"is updated");
    }

    if (segtree.is_used[node_index]) {
        item = <div className="seg-item is-used">
            {segtree.array[node_index]}
        </div>
    }
    
    return (
        <div className="seg-block">

            {item}

            <div className="seg-same-level">

                <SegBlock segtree={segtree} node_index={2*node_index}/>
                <SegBlock segtree={segtree} node_index={2*node_index+1}/>
            </div>
        </div>
    )
}

export default SegBlock;