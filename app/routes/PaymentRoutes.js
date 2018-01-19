const PaymentRoutes = (function() {
	const routes = {
		list: {
			method: 'get',
			path: '/payments'
		},
		show: {
			method: 'get',
			path: '/payments/:id'
		},
		save: {
			method: 'post',
			path: '/payments'
		},
		update: {
			method: 'put',
			path: '/payments/:id'
		},
		remove: {
			method: 'delete',
			path: '/payments/:id'
		}
	};

	routes.show.build = function(id) {
		return routes.show.path.replace(/:id/, id);
	};
	routes.update.build = function(id) {
		return routes.update.path.replace(/:id/, id);
	};
	routes.remove.build = function(id) {
		return routes.remove.path.replace(/:id/, id);
	};

	return routes;
});

module.exports = function() {
	return new PaymentRoutes();
};