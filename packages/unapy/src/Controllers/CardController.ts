import CardService from "@/Services/CardService"
import { Request, Response } from "express"

class CardController {
	async getCardList (req: Request, res: Response) {
		// Generate a temporary mapping just for getting the card list (used for preloading images)
		const tempMapping = CardService.generateRandomNumberToWordMapping()
		const cards = await CardService.getCardStack(tempMapping)

		const cardList = cards.map(card => ({ src: card.src }))

		return res.status(200).json({
			cards: cardList,
		})
	}
}

export default new CardController()
