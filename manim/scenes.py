#!/usr/bin/env python

from manimlib.imports import *

class Plot(GraphScene):
    CONFIG = {
        "y_max" : 6,
        "y_min" : -6,
        "x_max" : 9,
        "x_min" : -9,
        "y_tick_frequency" : 1,
        "x_tick_frequency" : 1,
        "graph_origin" : ORIGIN,
        "y_axis_label": None,
        "x_axis_label": None,
    }
    def construct(self):
        self.setup_axes()
        self.setup_signal([-1, 0, 1], [1, 2, 3])
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


    def setup_signal(self, x, y):
        for i in range(len(x)):
            l = Line([x[i]/2, 0, 0], [x[i]/2, y[i]/2, 0])
            l.set_color(BLUE)
            self.play(ShowCreation(l), run_time=0.4)
            d = Dot([x[i]/2, y[i]/2, 0])
            self.play(Write(d), run_time=0.1)
