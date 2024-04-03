/**
 * Colors for the One Accord application.
 * These colors are specifically tailored for the One Accord application
 * they are intentially prefixed with "oneAccord" in the event
 * that this becomes a monorepo and other applications are added.
 */


export const colors = {
  oneAccordRed: "bg-red-300",
  oneAccordBlue: "bg-blue-300",
  oneAccordGreen: "bg-green-300",
  // Add more colors as needed
};



/**
 * The exported type allows us to use the colors in a type-safe way.
 * for example, we can use the colors in a function like this:
 *  function getOneAccordColor(color: OneAccordColors) {
 *   return colors[color];
 * }
 */

export type OneAccordColors = keyof typeof colors;