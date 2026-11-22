export const BLOGS = [
  {
    id: 'SNB-00',
    slug: 'SNB-00',
    title: 'How to Tell If Two Circles Are Overlapping in 2D Space',
    subtitle: 'or: the day I used real math in programming',
    date: 'Nov 22, 2026',
    readTime: '10 min read',
    author: 'Samir Nepal',
    description: 'About four years ago I got a programming problem that looked harmless. Somewhere in the middle of that problem I needed to know whether one circle was touching another, and my brain just went blank. An intuitive visual walkthrough of coordinates, Pythagoras, and circle collision.',
    tags: ['Math', 'Algorithms', 'Geometry', 'Philosophy'],
    figures: [
      { id: 'figure-1', src: '/SNB-00/Figure-1.jpg', name: 'Figure-1.jpg', caption: 'Figure 1: The 2D plane, with the X-axis, Y-axis and the origin labeled.' },
      { id: 'figure-2', src: '/SNB-00/Figure-2.jpg', name: 'Figure-2.jpg', caption: 'Figure 2: Point G plotted at (3, 4), with dashed lines showing 3 units along X and 4 units along Y from the origin.' },
      { id: 'figure-3', src: '/SNB-00/Figure-3.jpg', name: 'Figure-3.jpg', caption: 'Figure 3: Multiple points plotted on the same 2D plane.' },
      { id: 'figure-4', src: '/SNB-00/Figure-4.png', name: 'Figure-4.png', caption: 'Figure 4: Points G and H joined by a straight line. A horizontal and a vertical dashed line complete a right-angled triangle, and the straight line between G and H is its longest side.' },
      { id: 'figure-5', src: '/SNB-00/Figure-5.png', name: 'Figure-5.png', caption: 'Figure 5: Two circles plotted in 2D space. The center of each circle is a labeled point with coordinates.' },
      { id: 'figure-6', src: '/SNB-00/Figure-6.jpg', name: 'Figure-6.jpg', caption: 'Figure 6: Two circles that are clearly apart. A blue line connects the two centers. Two orange lines show the radius of circle A and the radius of circle B, laid end to end along that line, with a visible gap left over.' },
      { id: 'figure-7', src: '/SNB-00/Figure-7.jpg', name: 'Figure-7.jpg', caption: 'Figure 7: Two overlapping circles. The distance between centers is drawn in blue, and the two radii in orange, laid along it. This time the orange lines are longer than the blue one, so they overlap in the middle.' },
    ]
  }
]
