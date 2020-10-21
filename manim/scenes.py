#!/usr/bin/env python

from manimlib.imports import *

class Plot(GraphScene):
    CONFIG = {
        "y_max" : 9,
        "y_min" : -9,
        "x_max" : 18,
        "x_min" : -18,
        "y_tick_frequency" : 1,
        "x_tick_frequency" : 1,
        "graph_origin" : ORIGIN,
        "y_axis_label": None,
        "x_axis_label": None,
        "x_axis_width": 18,
        "y_axis_height": 9,
        # "y_labeled_nums": range(-9, 9, 1),
        # "x_labeled_nums": range(-18, 18, 1)
    }
    def construct(self):
        self.setup_axes()
        x = np.array(range(-7, 7, 1))
        y = 3 * np.sin(x)
        
        g1 = VGroup()
        g2 = VGroup()


        
        # lines
        for i in range(len(x)):
            l1 = Line([x[i]/2, 0, 0], [x[i]/2, y[i]/2, 0])
            l1.set_color(BLUE)
            g1.add(l1)

            l2 = Line([-x[i]/2, 0, 0], [-x[i]/2, y[i]/2, 0])
            l2.set_color(BLUE)
            g2.add(l2)

        # dots
        for i in range(len(x)):
            d1 = Dot([x[i]/2, y[i]/2, 0])
            g1.add(d1)
            d2 = Dot([-x[i]/2, y[i]/2, 0])
            g2.add(d2)

        
        self.play(Write(g1))
        self.wait(2)
        self.play(Transform(g1, g2))
        self.wait(2)


    def setup_axes(self):
        GraphScene.setup_axes(self)

        # width of edges
        self.x_axis.set_stroke(width=1)
        self.y_axis.set_stroke(width=1)

        # color of edges
        self.x_axis.set_color(RED)
        self.y_axis.set_color(RED)
        self.play(
            *[Write(objeto)
            for objeto in [
                    self.y_axis,
                    self.x_axis,
                ]
            ],
            run_time=2
        )
