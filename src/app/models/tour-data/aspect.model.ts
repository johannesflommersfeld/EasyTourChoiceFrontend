export enum Aspect {
  UNKNOWN = 0,
  NORTH = 0b0000_0001,
  NORTH_EAST = 0b0000_0010,
  EAST = 0b0000_0100,
  SOUTH_EAST = 0b0000_1000,
  SOUTH = 0b0001_0000,
  SOUTH_WEST = 0b0010_0000,
  WEST = 0b0100_0000,
  NORTH_WEST = 0b1000_0000,
}