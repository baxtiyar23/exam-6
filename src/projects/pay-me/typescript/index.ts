// import { UserRepository, CardRepository } from './repository';
// import { generateCard, generateNumber, generateUser } from './generators';

// function init() {
// 	const userRepository = new UserRepository();
// 	const cardRepository = new CardRepository();

// 	const usersCount = 1 || generateNumber({ min: 1, max: 10 });
// 	const additionalCount = 0; // generateNumber({ min: 1, max: 10 });

// 	for (let i = 0; i < usersCount; i++) {
// 		const user = generateUser();
// 		userRepository.create(user!);

// 		const card = generateCard(user.getId());
// 		cardRepository.create(card);
// 	}

// 	for (let i = 0; i < additionalCount; i++) {
// 		const randomIdx = generateNumber({ min: 0, max: usersCount - 1 });
// 		const user = userRepository.getByIndex(randomIdx);

// 		const card = generateCard(user.getId());
// 		cardRepository.create(card);
// 	}

// 	console.log('users = ', userRepository.getList());
// 	console.log('cards = ', cardRepository.getList());
// }

// init();

type IPhoneModel = 'Iphone 13 Pro Max' | 'IPhone 14' | 'IPhone 15 Pro';
type SamsungModel = 'Samsung 22 Ultra' | 'Samsung 21 Ultra' | 'Samsung 23';

class Phone<TModel> {
	constructor(
		public model: TModel,
		public sim: number,
		public memory: number,
		public camera: number
	) {}

	photo() {
		console.log(`${this.model} is photo...`);
	}

	call() {
		console.log(`${this.model} is calling...`);
	}

	flash() {
		console.log(`${this.model} is flashing...`);
	}
}

class IPhone extends Phone<IPhoneModel> {
	lightness() {
		console.log(`${this.model} is lighting...`);
	}
}

class Samsung extends Phone<SamsungModel> {
	zoomX100() {
		console.log(`${this.model} is zooming...`);
	}
}

const iphone = new IPhone('Iphone 13 Pro Max', 2, 128, 64);
const samsung = new Samsung('Samsung 22 Ultra', 2, 128, 64);
