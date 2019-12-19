
function sum(...numbers) {
    let sum = 0;

    for(let i=0; i<numbers.length; i++) {
        sum += numbers[i];
    };

    return sum;
};

function avg(...numbers) {
    console.log( 'some.js It works!!' );

    return sum(...numbers) / numbers.length;
};

export default avg;