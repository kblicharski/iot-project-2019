from pymouse import PyMouseEvent
from pymouse import PyMouse




class event(PyMouseEvent):
    def __init__(self):
        super(event, self).__init__()
    def move(self, x, y):
        print("MOVED")
e=event()
e.start
m = PyMouse()

try:
    e.join()
except KeyboardInterrupt:
    e.stop()
    sys.exit()
