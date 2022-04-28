const hiBtn = document.querySelector('.hi');
const login = document.querySelector('.login');
const loginBtn = document.querySelector('.loginBtn');
const username = document.querySelector('.username');

const message = document.querySelector('.message');


if (localStorage.getItem('token')) {
	login.classList.add('hidden');
}


// add the token as a header to each call of axios
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

loginBtn.addEventListener('click', function() {
	if (username.value) {
		axios
			.post('/api/token/', {username : username.value})
			.then(function(result){
				const {token} = result.data;
				// update Axios's latest token
				localStorage.setItem('token', token);
				
				axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
			});
	}
});

hiBtn.addEventListener('click', function() {

	const url = `/api/name`;

	axios
		.get(url)
		.then(function(result){
			const {name} = result.data;
			message.innerHTML = name;
		})
		.catch(function(err){
			message.innerHTML = err.message;
		})

	// alert('hi!')
});