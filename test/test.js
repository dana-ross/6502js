// @ts-check

const fs = require('fs')

const CPU6502 = require('../src/CPU6502')
const memory = fs.readFileSync('./test/6502_65C02_functional_tests/bin_files/6502_functional_test.bin')

const read_byte = (function (memory) {
	return function (addr) {

		addr = Math.floor(addr);

		if (addr > 65535 || addr < 0) {
			throw new Error('Invalid read address ' + addr);
		}

		return memory[addr]
	}
}(memory))

const write_byte = (function (memory) {
	return function (addr, value) {

		addr = Math.floor(addr);

		if (addr > 65535 || addr < 0) {
			throw new Error('Invalid write address ' + addr);
		}

		memory[addr] = value
	}
}(memory))

function symbol_table_lookup(addr) {
	return undefined;
}

async function load_unified_rom(url) {
	return new Promise((resolve, reject) => {
		var req = new XMLHttpRequest();

		req.open("GET", url, true);
		req.responseType = "arraybuffer";
		req.onload = function (e) {
			resolve(req.response)
		};
		req.send();
	})
}

const cpu = new CPU6502(read_byte, write_byte, symbol_table_lookup)
cpu.reset()
cpu.PC = 0x400
const recentAddresses = []
while (true) {
	cpu.tick()
}
