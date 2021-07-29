import { expose } from 'comlink';
import { isPrime } from './primeNumberCheck';

const worker = { 
	isPrime 
}

export type isPrimeWorker = typeof worker;

expose(worker);