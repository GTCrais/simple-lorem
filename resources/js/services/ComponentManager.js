
class ComponentManager
{
	static registerComponents(app)
	{
		let components = {};
		const files = import.meta.glob('../**/*.vue', { eager: true });

		Object.keys(files).map(function(key) {
			let componentName = key.split('/').pop().split('.')[0];
			components[componentName] = files[key].default;
			app.component(componentName, components[componentName]);
		});

		return components;
	}
}

export default ComponentManager;
