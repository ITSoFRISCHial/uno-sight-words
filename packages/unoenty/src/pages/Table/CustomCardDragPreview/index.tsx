import React from "react"
import { useDragLayer, XYCoord } from "react-dnd"

import { CARD_TYPE, DraggedCardItem } from "@/pages/Table/CardDeck"

import useStyles from "@/pages/Table/CustomCardDragPreview/styles"

import { useCardStore } from "@/store/Card"

import UnoCard from "@/components/UnoCard"

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
								{cardStore?.selectedCards?.map((card, index) => {
									const isNumberCard = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(card.type)

									return (
										<div
											key={index}
											style={{
												position: "relative",
												left: +index * 20,
											}}
										>
											{isNumberCard && card.word ? (
												<UnoCard
													color={card.color}
													type={card.type}
													word={card.word}
													className={item.className}
													style={{
														filter: "saturate(1.5)",
														position: "absolute",
													}}
													alt={card.name}
												/>
											) : (
												<img
													alt={card.name}
													src={card.src}
													className={item.className}
													style={{
														filter: "saturate(1.5)",
														position: "absolute",
													}}
												/>
											)}
										</div>
									)
								})}
							</>
						) : (
							<div style={{ position: "relative", display: "inline-block" }}>
								{(() => {
									const isNumberCard = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(item.cardType)

									if (isNumberCard && item.word) {
										return (
											<UnoCard
												color={item.color}
												type={item.cardType}
												word={item.word}
												className={item.className}
												style={{ filter: "saturate(1.5)" }}
												alt={item.name}
											/>
										)
									}

									return (
										<img
											alt={item.name}
											src={item.src}
											className={item.className}
											style={{ filter: "saturate(1.5)" }}
										/>
									)
								})()}
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
