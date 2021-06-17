import './CardList.css';
import Card from '../Card/Card'

const CardList = (props) => {
    // Define different card per list to render
    const newItems = props.banlistRef[props.listTag].map((item, iter) => (
        <div key={`Monster-${iter}`}>
            <Card
                // Values to render in card 
                name={item.name}
                statusTCG={item.statusTCG}
                statusOCG={item.statusOCG}
                picture={item.picture}
                // Values to modify the card
                listTag={props.listTag}
                banlistRef={props.banlistRef}
                setBanlist={props.setBanlist}>
            </Card>
        </div>
    ))

    return (
        <section className="card-list-container">
            <div className="card-list-container__list-title">
                <hr className="card-list-container__list-title__line" />
                <p className="card-list-container__list-title__list-name">{props.title}</p>
                <hr className="card-list-container__list-title__line" />
            </div>

            <div className="card-list-container__card-list">
                {newItems}
            </div>
        </section>
    )
}

export default CardList;
