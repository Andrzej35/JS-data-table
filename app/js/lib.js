// currying function simple

// const curry = (fn) => {
// 	return (a) => {
// 		return (b) => {
// 			return fn(a, b);
// 		}
// 	}
// };

// curry function more generic
const curry = (fn) => (
	(...args) => (
		fn.length <= 1 || args.length >= fn.length ? fn(...args) : args.reduce((acc, curr) => (
			curry(acc.bind(null, curr)), fn)
		)
	)
);

// splitting data for more managable format
const splitData = (data, chunk) => {
	return data.reduce((a, c, i) => {
		const ind = Math.floor(i / chunk);
		a[ind] = (a[ind] || []).concat(c);
		return a;
	}, []);
};

// composition function simple 
// const compose = (f, g) => {
// 	return (a) => {
// 		return f(g(a));
// 	}
// };

// composition more generic
const compose = (...fns) => (
	(x) => fns.reduceRight(
		(acc, curr) => curr(acc), x
	)
);


// mapper accepts function than data
const mapper = (fn, arr) => {
	return arr.map(fn).join('');
};

export { curry, splitData, compose, mapper };