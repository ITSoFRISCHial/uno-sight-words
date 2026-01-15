import React from "react"
import { CardColors, CardTypes } from "@uno-game/protocols"

type UnoCardProps = {
	color: CardColors
	type: CardTypes
	word?: string
	className?: string
	style?: React.CSSProperties
	alt?: string
}

const COLOR_MAP = {
	blue: {
		primary: "#005eab",
		gradient: "linear-gradient(135deg, #63a7c5 0%, #005eab 100%)",
	},
	green: {
		primary: "#0a7d3b",
		gradient: "linear-gradient(135deg, #50c878 0%, #0a7d3b 100%)",
	},
	red: {
		primary: "#d1001c",
		gradient: "linear-gradient(135deg, #ff4d4d 0%, #d1001c 100%)",
	},
	yellow: {
		primary: "#ffaa00",
		gradient: "linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)",
	},
	black: {
		primary: "#000000",
		gradient: "linear-gradient(135deg, #333333 0%, #000000 100%)",
	},
}

const isNumberCard = (type: CardTypes): boolean => {
	return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(type)
}

// Calculate dynamic font size based on word length
const getMainFontSize = (wordLength: number): string => {
	// Base size for short words (1-3 chars): reduced to fit better
	// Scale down as words get longer
	if (wordLength <= 2) { return "38px" }
	if (wordLength <= 4) { return "30px" }
	if (wordLength <= 6) { return "22px" }
	if (wordLength <= 8) { return "18px" }
	return "14px" // Very long words
}

const getCornerFontSize = (wordLength: number): string => {
	if (wordLength <= 4) { return "14px" }
	if (wordLength <= 6) { return "11px" }
	return "9px"
}

export const UnoCard: React.FC<UnoCardProps> = ({ color, type, word, className, style, alt }) => {
	// For action and wild cards, we'll still use the SVG (fallback)
	if (!isNumberCard(type)) {
		// For now, keep action cards as-is (this could be enhanced later)
		return <div className={className} style={style}>{alt}</div>
	}

	// For number cards, render custom HTML card with sight word
	const colorScheme = COLOR_MAP[color] || COLOR_MAP.blue
	const rawWord = word || type
	// Convert to title case (first letter uppercase, rest lowercase)
	const displayWord = rawWord.charAt(0).toUpperCase() + rawWord.slice(1).toLowerCase()
	const mainFontSize = getMainFontSize(displayWord.length)
	const cornerFontSize = getCornerFontSize(displayWord.length)

	return (
		<div
			className={className}
			style={{
				...style,
				background: colorScheme.gradient,
				borderRadius: "12px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				overflow: "hidden",
				aspectRatio: "165/256",
			}}
		>
			{/* Main center word */}
			<div
				style={{
					fontSize: mainFontSize,
					fontWeight: "bold",
					fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
					color: "#ffffff",
					textAlign: "center",
					textShadow: "0 2px 8px rgba(0,0,0,0.5)",
					whiteSpace: "nowrap",
					padding: "0 10px",
				}}
			>
				{displayWord}
			</div>

			{/* Top-left corner word */}
			<div
				style={{
					position: "absolute",
					top: "8px",
					left: "8px",
					fontSize: cornerFontSize,
					fontWeight: "bold",
					fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
					color: "#ffffff",
					textShadow: "0 1px 4px rgba(0,0,0,0.5)",
					whiteSpace: "nowrap",
				}}
			>
				{displayWord}
			</div>

			{/* Bottom-right corner word (rotated) */}
			<div
				style={{
					position: "absolute",
					bottom: "8px",
					right: "8px",
					fontSize: cornerFontSize,
					fontWeight: "bold",
					fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
					color: "#ffffff",
					textShadow: "0 1px 4px rgba(0,0,0,0.5)",
					transform: "rotate(180deg)",
					whiteSpace: "nowrap",
				}}
			>
				{displayWord}
			</div>

			{/* White border ring for classic UNO look */}
			<div
				style={{
					position: "absolute",
					top: "6px",
					left: "6px",
					right: "6px",
					bottom: "6px",
					border: "2px solid #ffffff",
					borderRadius: "8px",
					pointerEvents: "none",
					opacity: 0.3,
				}}
			/>
		</div>
	)
}

export default UnoCard
