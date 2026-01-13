import React from "react"
import { useDragLayer, XYCoord } from "react-dnd"

import { CARD_TYPE, DraggedCardItem } from "@/pages/Table/CardDeck"

import useStyles from "@/pages/Table/CustomCardDragPreview/styles"

import { useCardStore } from "@/store/Card"

const CustomCardDragPreview: React.FC = () => {
	const {
		itemType,
		isDragging,
		item,
		initialOffset,
		currentOffset,
	} = useDragLayer((monitor) => ({
		item: monitor.getItem() as DraggedCardItem,
		itemType: monitor.getItemType(),
		initialOffset: monitor.getInitialSourceClientOffset(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging(),
	}))

	const classes = useStyles()
	const cardStore = useCardStore()

	const getItemStyles = (initialOffset: XYCoord | null, currentOffset: XYCoord | null) => {
		if (!initialOffset || !currentOffset) {
			return {
				display: "none",
			}
		}

		const { x, y } = currentOffset

		const transform = `translate(${x}px, ${y}px)`

		return {
			transform,
			WebkitTransform: transform,
			position: "relative" as const,
			width: 0,
		}
	}

	if (isDragging) {
		return (
			<div className={classes.container} >
				<div style={getItemStyles(initialOffset, currentOffset)}>
					{itemType === CARD_TYPE &&
            cardStore?.selectedCards?.length &&
            cardStore?.selectedCards?.every(card => card.type === item.cardType) ? (
							<>
								{cardStore?.selectedCards?.map((card, index) => (
									<div
										key={index}
										style={{
											position: "relative",
											left: +index * 20,
										}}
									>
										<img
											alt={card.name}
											src={card.src}
											className={item.className}
											style={{
												filter: "saturate(1.5)",
												position: "absolute",
											}}
										/>
										{card.word && (
											<div
												style={{
													position: "absolute",
													top: "50%",
													left: "50%",
													transform: "translate(-50%, -50%)",
													fontSize: card.word.length > 5 ? "20px" : "28px",
													fontWeight: "bold",
													color: "#fff",
													textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
													pointerEvents: "none",
													textAlign: "center",
													maxWidth: "80%",
													wordWrap: "break-word",
													lineHeight: card.word.length > 5 ? "1.2" : "1",
												}}
											>
												{card.word}
											</div>
										)}
									</div>
								))}
							</>
						) : (
							<div style={{ position: "relative", display: "inline-block" }}>
								<img
									alt={item.name}
									src={item.src}
									className={item.className}
									style={{ filter: "saturate(1.5)" }}
								/>
								{cardStore?.selectedCards?.find(c => c.id === item.id)?.word && (
									<div
										style={{
											position: "absolute",
											top: "50%",
											left: "50%",
											transform: "translate(-50%, -50%)",
											fontSize: cardStore?.selectedCards?.find(c => c.id === item.id)?.word.length > 5 ? "20px" : "28px",
											fontWeight: "bold",
											color: "#fff",
											textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
											pointerEvents: "none",
											textAlign: "center",
											maxWidth: "80%",
											wordWrap: "break-word",
											lineHeight: cardStore?.selectedCards?.find(c => c.id === item.id)?.word.length > 5 ? "1.2" : "1",
										}}
									>
										{cardStore?.selectedCards?.find(c => c.id === item.id)?.word}
									</div>
								)}
							</div>
						)}
				</div>
			</div>
		)
	} else {
		return <React.Fragment />
	}
}

export default CustomCardDragPreview
