/// <reference types="vite/client" />

declare module '*.css';

declare module 'virtual:pwa-register' {
	export function registerSW(options?: { immediate?: boolean }): () => Promise<void>;
}

interface SpeechRecognitionLike {
	lang: string;
	interimResults: boolean;
	continuous: boolean;
	onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
	onerror: ((event: { error?: string }) => void) | null;
	onend: (() => void) | null;
	start: () => void;
	stop: () => void;
	abort: () => void;
}

interface SpeechRecognitionConstructor {
	new (): SpeechRecognitionLike;
}

interface Window {
	SpeechRecognition?: SpeechRecognitionConstructor;
	webkitSpeechRecognition?: SpeechRecognitionConstructor;
}