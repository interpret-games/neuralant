import { onBeforeProjectStart, playerShieldIncrement, activateSupermove, makeInputLockForSupermove } from "./main.js"


const scriptsInEvents = {

	async EventSheet1_Event15_Act1(runtime, localVars)
	{
		onBeforeProjectStart(runtime)
	},

	async Global_Event1_Act2(runtime, localVars)
	{
		playerShieldIncrement()
	},

	async Global_Event21_Act1(runtime, localVars)
	{
		makeInputLockForSupermove()
		activateSupermove()
	},

	async EventSheet2_Event15_Act1(runtime, localVars)
	{
		onBeforeProjectStart(runtime)
	},

	async EventSheet3_Event15_Act1(runtime, localVars)
	{
		onBeforeProjectStart(runtime)
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

