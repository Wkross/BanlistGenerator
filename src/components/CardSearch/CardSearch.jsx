import './CardSearch.css';
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import DropdownBanlist from '../DropdownBanlist/DropdownBanlist'
import placeHolder from '../../assets/PlaceHolderCard.png';
import { useState } from 'react';

const CardSearch = (props) => {
    const [dropdownValue, setDropdownValue] = useState('');
    const [cardEntryValue, setcardEntryValue] = useState('');

    const handleCardEntryChange = (event) => {
        setcardEntryValue(event.target.value);
    }

    const searchCard = () => {
        // Set URL to do fetch
        const URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?name=';
        const NEW_URL = URL + parseCardName(cardEntryValue)

        if (cardEntryValue === '' || dropdownValue === '') {
            // Modal insert
            console.log('NOT INSERTED DATA')
        } else {
            setcardEntryValue('');

            const isCardInList = checkCardInList(cardEntryValue);
            if (isCardInList) {
                // Modal insert
                console.log('THE CARD IS CURRENTLY IN THE LIST');
            } else {
                // Make the fetch
                doFetch(NEW_URL);
            }
        }
    }

    const checkCardInList = (cardName) => {
        // Change card name to Pascal Case
        cardName = cardName.replace(
            /(\w)(\w*)/g,
            function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); }
        );

        // Read the list looking for the card to insert
        for (const list in props.banlistRef) {
            for (let i = 0; i < props.banlistRef[list].length; i++) {
                const card = props.banlistRef[list][i];
                if (card.name === cardName) {
                    return true;
                }
            }
        }

        return false;
    }

    const doFetch = (URL) => {
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                try {
                    // Copy banlist object to make changes
                    let newBanlist = JSON.parse(JSON.stringify(props.banlistRef));

                    // Add new item to the picked list
                    newBanlist[dropdownValue].push({
                        name: data.data[0].name || 'NONE',
                        picture: data.data[0].card_images[0].image_url || placeHolder,
                        statusTCG: (data.data[0].banlist_info && data.data[0].banlist_info.ban_tcg) ? data.data[0].banlist_info.ban_tcg : 'Unlimited',
                        statusOCG: (data.data[0].banlist_info && data.data[0].banlist_info.ban_ocg) ? data.data[0].banlist_info.ban_ocg : 'Unlimited'
                    })

                    // Update the original list
                    props.setBanlist(newBanlist);
                } catch {
                    // Modal insert
                    console.log('ITS NOT POSSIBLE ADD CARD')
                }
            })
            .catch(
                // Modal insert
                // console.log('ERROR GETTING THE CARD FROM API')
            )
    }

    const parseCardName = (cardName) => {
        // Get new string with the specific way to request API
        let newCardName = cardName.split(' ').join('%20');
        return newCardName;
    }

    const handleKeyDown = (event) => {
        // Input press Enter search launch
        if (event.key === 'Enter') {
            searchCard()
        }
    }

    return(
        <div className="card-search-container">
            <FormControl
                id="card-entry"
                onKeyDown={handleKeyDown}
                aria-describedby="basic-addon3"
                placeholder="Insert card name"
                value={cardEntryValue}
                onChange={handleCardEntryChange}
            />
            <DropdownBanlist
                setValue={setDropdownValue}
                initialValue="Pick a list"
                changeStatus={true}
            />

            <Button id="search-btn" variant="dark" onClick={searchCard}>Add card to list</Button>
        
        </div>
    )
}

export default CardSearch;
