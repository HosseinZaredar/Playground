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

        # x:
        tx = np.array(range(-7, 7, 1))
        yx = 3 * np.sin(tx)

        gx1 = VGroup()
        gx2 = VGroup()

        # lines
        for i in range(len(tx)):
            lx1 = Line([tx[i]/2, 0, 0], [tx[i]/2, yx[i]/2, 0])
            lx1.set_color(GREEN)
            gx1.add(lx1)

            lx2 = Line([-tx[i]/2, 0, 0], [-tx[i]/2, yx[i]/2, 0])
            lx2.set_color(GREEN)
            gx2.add(lx2)

        # dots
        for i in range(len(tx)):
            dx1 = Dot([tx[i]/2, yx[i]/2, 0])
            dx1.set_color(GREEN)
            gx1.add(dx1)
            dx2 = Dot([-tx[i]/2, yx[i]/2, 0])
            dx2.set_color(GREEN)
            gx2.add(dx2)

        
        self.play(Write(gx1))
        self.wait(1)


        # h:

        th = np.array(range(-3, 2, 1))
        yh = 2 * np.cos(th)
        
        gh1 = VGroup()
        gh2 = VGroup()

        # lines
        for i in range(len(th)):
            lh1 = Line([th[i]/2, 0, 0], [th[i]/2, yh[i]/2, 0])
            lh1.set_color(BLUE)
            gh1.add(lh1)

            lh2 = Line([-th[i]/2, 0, 0], [-th[i]/2, yh[i]/2, 0])
            lh2.set_color(BLUE)
            gh2.add(lh2)

        # dots
        for i in range(len(th)):
            dh1 = Dot([th[i]/2, yh[i]/2, 0])
            dh1.set_color(BLUE)
            gh1.add(dh1)
            dh2 = Dot([-th[i]/2, yh[i]/2, 0])
            dh2.set_color(BLUE)
            gh2.add(dh2)

        
        self.play(Write(gh1))
        self.wait(1)
        self.play(Transform(gh1, gh2))
        self.wait(1)

        self.remove(gh1)
        self.play(gh2.shift, [-6, 0, 0], run_time=1.5)
        self.wait(1)

        th_min = -th[len(th) - 1]
        th_max = -th[0]
        yh_min = min(*yh)
        yh_max = max(*yh)

        rect = Polygon([th_min/2-1/4, yh_min/2-1/4, 0], [th_max/2+1/4, yh_min/2-1/4, 0],
                [th_max/2+1/4, yh_max/2+1/4, 1], [th_min/2-1/4, yh_max/2+1/4, 0])
        rect.set_color(WHITE)
        rect.shift([-6, 0, 0])
        self.play(Write(rect))

        self.wait(1)

        window = VGroup(gh2, rect)

        for i in range(22):
            self.play(window.shift, [0.5, 0, 0], run_time=0.5)
            self.wait(1)



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
