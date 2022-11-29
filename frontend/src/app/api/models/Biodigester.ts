export interface Biodigester{
    id:number;
	idToken:string;
	state:boolean;
	uAgriEnvironmental:string;
	tempPoint:number;
	light:boolean;
	fan:boolean;
	proportionalGain:number;
	integralTime:number;
	derivativeTime:number;
}