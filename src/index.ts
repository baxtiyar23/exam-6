interface Car {
	name: string;
	capacity: string;
	arrival: Date | string;
  }
  
  (function () {
	const $ = <T extends HTMLElement>(query: string): T | null => document.querySelector(query);
  
	function calcDuration(mil: number) {
	  const min = Math.floor(mil / 60000);
	  const sec = Math.floor((mil % 60000) / 1000);
  
	  return `${min}m and ${sec}s`;
	}
  
	function calcPrice(durationInMinutes: number, rate: number) {
	  return durationInMinutes * rate;
	}
  
	function parkingOccupancy() {
	  let parkedCars: Car[] = [];
	  const fixedRate = 2; // Fixed parking rate
  
	  function addCarInfo(vehicle: Car) {
		const row = document.createElement("tr");
  
		const arrivalTime = new Date(vehicle.arrival);
		const currentTime = new Date();
		const duration = calcDuration(currentTime.getTime() - arrivalTime.getTime());
		const price = calcPrice((currentTime.getTime() - arrivalTime.getTime()) / (1000 * 60), fixedRate);
  
		row.innerHTML = `
		  <td>${vehicle.name}</td>
		  <td>${vehicle.capacity}</td>
		  <td>${arrivalTime.toLocaleString()}</td>
		  <td>$${fixedRate.toFixed(2)}</td>
		  <td>
			<button class="remove" data-capacity="${vehicle.capacity}"><i class="fa-regular fa-trash-can"></i></button>
			<button class="quit" data-capacity="${vehicle.capacity}">Quit</button>
		  </td>
		`;
  
		row.querySelector(".remove")?.addEventListener("click", function () {
		  removeCarInfo(this.dataset.capacity);
		});
  
		row.querySelector(".quit")?.addEventListener("click", function () {
		  quitCar(this.dataset.capacity);
		});
  
		$("#parkingOccupancy")?.appendChild(row);
		parkedCars.push(vehicle);
	  }
  
	  function removeCarInfo(capacity: string) {
		parkedCars = parkedCars.filter((vehicle) => vehicle.capacity !== capacity);
		renderCarInfo();
	  }
  
	  function quitCar(capacity: string) {
		const vehicleToQuit = parkedCars.find((vehicle) => vehicle.capacity === capacity);
  
		if (vehicleToQuit) {
		  const { arrival, name } = vehicleToQuit;
  
		  const duration = calcDuration(new Date().getTime() - new Date(arrival).getTime());
		  const price = calcPrice((new Date().getTime() - new Date(arrival).getTime()) / (1000 * 60), fixedRate);
  
		  const formattedDuration = `${duration}`;
		  const formattedPrice = `$${price.toFixed(2)}`;
  
		  const confirmation = confirm(`The vehicle ${name} has been parked for ${formattedDuration}. The price is ${formattedPrice}. Do you wish to quit?`);
  
		  if (confirmation) {
			const quitButton = document.querySelector(`.quit[data-capacity="${capacity}"]`);
			const row = quitButton?.closest("tr");
			row?.remove();
			parkedCars = parkedCars.filter((vehicle) => vehicle.capacity !== capacity);
			renderCarInfo();
		  }
		}
	  }
  
	  function renderCarInfo() {
		$("#parkingOccupancy")!.innerHTML = "";
		if (parkedCars.length) {
		  parkedCars.forEach((vehicle) => addCarInfo(vehicle));
		}
	  }
  
	  return { addCarInfo, removeCarInfo, quitCar, renderCarInfo };
	}
  
	const parking = parkingOccupancy();
  
	document.addEventListener("DOMContentLoaded", () => {
	  const quitButtons = document.querySelectorAll('.quit');
  
	  quitButtons.forEach((button) => {
		button.addEventListener('click', function () {
		  const capacity = this.dataset.capacity;
		  parking.quitCar(capacity);
		});
	  });
	});
  
	$("#register")?.addEventListener("click", () => {
		// @ts-ignore
	  const name = $("#carName")?.value;
	//   @ts-ignore
	  const capacity = $("#carCapacity")?.value;
  
	  if (!name || !capacity) {
		alert("All fields are required");
		return;
	  }
  
	  parking.addCarInfo({ name, capacity, arrival: new Date().toISOString() });
	});
  })();
  