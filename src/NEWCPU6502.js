module.exports = function CPU6502(read_byte, write_byte, symbol_table_lookup) {

	"use strict"

	let emulatorState = {
		A: 0,
		X: 0,
		Y: 0,
		S: 32, /* bit 5 set */
		SP: 0,
		PC: 0,

		reset: (read_word) => {
			this.A = 0;
			this.X = 0;
			this.Y = 0;
			this.S = 32 /* bit 5 set */;
			this.SP = 0;
			this.PC = read_byte(0xfffc);
		}
	}
}
