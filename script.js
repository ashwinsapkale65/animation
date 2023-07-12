const { Illustration, RoundedRect, Ellipse, Group, Shape, TAU } = Zdog;

const n = 100;
const r = 100;
const gap = 4;
const points = Array(n)
	.fill()
	.map((_, i, { length }) => {
		const angle = (((360 / length) * i) / 180) * Math.PI;
		const x = Math.cos(angle) * r;
		const y = Math.sin(angle) * r;
		return {
			x,
			y
		};
	});

const lines = Array(Math.floor(points.length / gap))
	.fill()
	.map((_, i) => {
		const i1 = i * gap;
		const i2 = i * gap + 1;
		const { x: x1, y: y1 } = points[i1];
		const { x: x2, y: y2 } = points[i2];
		return {
			x1,
			y1,
			x2,
			y2
		};
	});

const svg = document.querySelector("svg");

illustration = new Illustration({
	element: svg
});

const scene = new RoundedRect({
	addTo: illustration,
	width: 400,
	height: 400,
	fill: true,
	color: "hsl(0 0% 90%)",
	cornerRadius: 20
});

new Ellipse({
	addTo: scene,
	diameter: 300,
	fill: true,
	color: "hsl(0 0% 97%)"
});

const groupLines = new Group({
	addTo: scene,
	translate: { z: 5 }
});

for (const { x1, y1, x2, y2 } of lines) {
	new Shape({
		addTo: groupLines,
		stroke: 4,
		path: [
			{ x: x1, y: y1 },
			{ x: x2, y: y2 }
		],
		color: "hsl(0 0% 65%)"
	});
}

new Ellipse({
	addTo: scene,
	diameter: 100,
	fill: true,
	color: "hsl(0 0% 65%)"
});

groupSpheres = new Group({
	addTo: scene,
	translate: { z: 15 }
});

new Shape({
	addTo: groupSpheres,
	stroke: 30,
	color: "hsl(200 85% 55%)",
	translate: { y: -r }
});

new Shape({
	addTo: groupSpheres,
	stroke: 30,
	color: "hsl(40 90% 55%)",
	translate: { y: r }
});

illustration.rotate.x = TAU / 5;
illustration.rotate.z = TAU / 16;
illustration.updateRenderGraph();

const animate = () => {
	groupSpheres.rotate.z = (groupSpheres.rotate.z + 0.02) % TAU;
	illustration.updateRenderGraph();
	requestAnimationFrame(animate);
};

animate();