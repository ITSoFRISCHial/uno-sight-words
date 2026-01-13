/**
 * Dolch Kindergarten Sight Words (40 words)
 * Used for replacing number cards (0-9) in the UNO game
 */
export const DOLCH_KINDERGARTEN_SIGHT_WORDS = [
	"a",
	"and",
	"away",
	"big",
	"blue",
	"can",
	"come",
	"down",
	"find",
	"for",
	"funny",
	"go",
	"help",
	"here",
	"I",
	"in",
	"is",
	"it",
	"jump",
	"little",
	"look",
	"make",
	"me",
	"my",
	"not",
	"one",
	"play",
	"red",
	"run",
	"said",
	"see",
	"the",
	"three",
	"to",
	"two",
	"up",
	"we",
	"where",
	"yellow",
	"you",
] as const

export type SightWord = typeof DOLCH_KINDERGARTEN_SIGHT_WORDS[number]

/**
 * Type representing a mapping from card numbers (0-9) to sight words
 */
export type NumberToWordMapping = {
	[key in "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"]: string
}
