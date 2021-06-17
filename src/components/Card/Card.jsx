// import { useState } from 'react';
import './Card.css';
import placeHolder from '../../assets/PlaceHolderCard.png';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import DropdownBanlist from '../DropdownBanlist/DropdownBanlist';
import { BsTrashFill } from "react-icons/bs";

const MonsterCard = (props) => {
	const deleteCard = () => {
		const cardIndex = searchCardInList(props.name);

		// Make a copy of the list and delete the specific item
		let newBanlist = JSON.parse(JSON.stringify(props.banlistRef));
		newBanlist[props.listTag].splice(cardIndex, 1)
		
		props.setBanlist(newBanlist);
	}

	const moveCard = (newDropdownValue) => {
		if (newDropdownValue !== '') {
			const cardIndex = searchCardInList(props.name);

			let newBanlist = JSON.parse(JSON.stringify(props.banlistRef));
			
			let cardToMove = newBanlist[props.listTag][cardIndex];

			// Delete the item from the past list
			newBanlist[props.listTag].splice(cardIndex, 1)

			// Add the item in the new list
			newBanlist[newDropdownValue].push(cardToMove);

			props.setBanlist(newBanlist);
		} else {
			// Modal insert
			console.log('ITS NOT POSSIBLE MOVE THE CARD')
		}
	}

	const searchCardInList = (cardName) => {
		// Get specifi list inside object
		let specificList = props.banlistRef[props.listTag];
		let cardIndex;

		for (let i = 0; i < specificList.length; i++) {
			const card = specificList[i];
			if (card.name === cardName) {
				cardIndex = i;
			}
		}

		return cardIndex;
	}

	const setDropdownItems = () => {
		// Set the list values excluding the current list
		let dropdownItems = [];

		if (props.listTag !== 'forbidden') {
			dropdownItems.push({
				value: "forbidden",
				visibleValue: "Forbidden"
			})
		}
		if (props.listTag !== 'limited') {
			dropdownItems.push({
				value: "limited",
				visibleValue: "Limited"
			})
		}
		if (props.listTag !== 'semilimited') {
			dropdownItems.push({
				value: "semilimited",
				visibleValue: "Semi Limited"
			})
		}
		if (props.listTag !== 'unlimited') {
			dropdownItems.push({
				value: "unlimited",
				visibleValue: "Unlimited"
			})
		}
		
		return dropdownItems;
	}

	return (
		<Card className="card-container">
			<Card.Img className="card-container__card-picture" variant="top" src={props.picture || placeHolder} />
			<Card.Body className="card-container__card-body">
				<p className="card-container__card-body__card-data-name" >{(props.name).toUpperCase()}</p>
				<div className="card-container__card-body__card-data">
					<p>TCG: {props.statusTCG}</p>
					<p>OCG: {props.statusOCG}</p>
				</div>
				<div className="card-container__card-body__card-button-container">
					<DropdownBanlist className="card-container__card-body__card-button-container__card-dropdown-button"
						initialValue="Move Card"
						callbackStack={[moveCard]}
						items={setDropdownItems()}
						changeStatus={false}
						/>
					<Button className="card-container__card-body__card-button-container__card-button" variant="danger" onClick={deleteCard}><BsTrashFill /></Button>
				</div>
			</Card.Body>
		</Card>
	)
}

export default MonsterCard;
