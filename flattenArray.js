function flattenArray(inArray){
	var outArray = [];
	inArray.forEach(function(element){
		if (Object.prototype.toString.call(element) === '[object Array]'){
			outArray = outArray.concat(flattenArray(element));
		}
		else {
			outArray.push(element);
		}
	});
	return outArray;
}


function testFlattenArray(){
	var inputArray = ['cat',['poodle', 'beagle'],['macaw'],[[ 1, 2, [3]], 4, ['hot dog']], 'carrot'];

	var answerArray = [ 'cat', 'poodle', 'beagle', 'macaw', 1, 2, 3, 4, 'hot dog', 'carrot' ];

	// compareArray function tests to see that two input arrays contain the same elements
	function compareArrays(inArray1, inArray2){
		return ((inArray1.length == inArray2.length) && inArray1.every(function (element, index){
			return element === inArray2[index];
		}));
	}
	
	if (compareArrays(flattenArray(inputArray), answerArray)){
		console.log('flattenArray working properly');
	}
	else {
		console.log('flattenArray BROKEN');
	}
}
console.log(testFlattenArray());