
function Details(props){
    return(
    <div className="cards">
        {props.txt}
        <span id={props.id}>{props.value}</span>
        </div>
    );
}

export default Details;