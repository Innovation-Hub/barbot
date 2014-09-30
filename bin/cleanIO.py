#! /usr/bin/env python
import os

def closePin(pinNo, gpioType):
    ''' close pin the way it needs to be closed depending on type '''
    path = "/sys/class/"
    path += "pwm/pwmchip0/unexport" if gpioType == "PWM" else "gpio/unexport"
    if os.path.exists("/sys/class/gpio/gpio" + str(pinNo)):
        os.system("echo " + str(pinNo) + " > " + path)
        if not os.path.exists("/sys/class/gpio/gpio" + str(pinNo)):
            return True
    else:
        return True
    return False


def main():
    # GPIO LIST
    pinList = {16: 'PWM', 17: 'PWM', 18: 'PWM', 19: 'PWM', 20: 'ANALOG', 
                21: 'ANALOG', 22: 'ANALOG', 23: 'ANALOG', 24: 'PWM', 25: 'PWM', 
                26: 'DIGITAL', 27: 'DIGITAL', 28: 'DIGITAL', 32: 'DIGITAL', 
                36: 'ANALOG', 37: 'ANALOG', 38: 'DIGITAL', 39: 'DIGITAL', 
                50: 'DIGITAL', 51: 'DIGITAL'}
    # ask to close each GPIO
    for pinNo, pinType in pinList.iteritems():
        if closePin(pinNo, pinType):
            print "ok - closed " + pinType + " : " + str(pinNo)
        else:
            print "Err! ALREADY CLOSED " + pinType + " : " + str(pinNo)


if __name__ == "__main__":
    main()

