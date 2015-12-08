var pets = ['cat', 'dog', 'rat'];
for (pet in pets){
	pets[pet] = pets[pet] + 's';
}
console.log(pets);