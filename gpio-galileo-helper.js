/**
 * Crafted by Obero on 02/14/14
 * For Epitech Innovation Hub
 * Edited by Obero on 29/09/14
 */

"use strict";
var fs = require('fs');

/**
 * GalileoGpio helps you to manipulate GPIO on Intel Galileo board.
 *
 * @class GalileoGpio
 * @constructor
 */
var GalileoGpio = function()
{
    /**
     * Helps you to work directly on a given IO pin with its number,
     * mapping its number to the matching GPIO id.
     * @property pin
     * @type Object
     */
    this.pin =
    {
        // Analogic
        'A0': {"id" : "37", "index" :0},
        'A1': {"id" : "36", "index" :1},
        'A2': {"id" : "23", "index" :2},
        'A3': {"id" : "22", "index" :3},
        'A4': {"id" : "21", "index" :4}, 
        'A5': {"id" : "20", "index" :5},  

        // Digital
        0: {"id" : "50"},
        1: {"id" : "51"},
        2: {"id" : "32"},
        4: {"id" : "28"},
        7: {"id" : "27"},
        8: {"id" : "26"},
        12: {"id" : "38"},
        13: {"id" : "39"},

        // PWM ready
        3: {"id" : "18", "index": 3, "period": 0},
        5: {"id" : "17", "index": 5, "period": 0},
        6: {"id" : "24", "index": 6, "period": 0},
        9: {"id" : "19", "index": 1, "period": 0},
        10: {"id" : "16", "index": 7, "period": 0},
        11: {"id" : "25", "index": 4, "period": 0}
    };

    /**
     * Pwm states helper
     * @property pwmState
     * @property Object
     */
    this.pwmState =
    {
        'ON':   "1",
        'OFF':  "0"
    };

    /**
     * GPIO system path
     * @property gpioPath
     * @type Object
     */
    this.gpioPath = "/sys/class/gpio";
    this.pwmPath = "/sys/class/pwm/pwmchip0"
};

GalileoGpio.prototype.openGPIO = function()
{
    //TODO: direct use of GPIO number, it can be useful
};

/**
 * Exports a GPIO to make it reachable on the system.
 *
 * @method openPin
 * @param {Number} pin_number Number of the pin on the Galileo board.
 */
GalileoGpio.prototype.openPin = function(pin_number)
{
    //TODO: use rough GPIO method once available
    if (!fs.existsSync(this.gpioPath + "/gpio" + this.pin[pin_number].id))
    {
        fs.writeFileSync(this.gpioPath + "/export", this.pin[pin_number].id);
    }
};

/**
 * Set the direction of the pin.
 *
 * @method setPinDirection
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {String} direction Either `in` or `out`
 */
GalileoGpio.prototype.setPinDirection = function(pin_number, direction)
{
    fs.writeFileSync(this.gpioPath + "/gpio" + this.pin[pin_number].id + "/direction", direction);
};

/**
 * Set the configuration type of the pin
 *
 * @method setPinPortDrive
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {String} config_type Either `pullup`, `pulldown`, `strong`, `hiz`
 */
GalileoGpio.prototype.setPinPortDrive = function(pin_number, config_type)
{
    fs.writeFileSync(this.gpioPath + "/gpio" + this.pin[pin_number].id + "/drive", config_type);
};

/**
 * Write data on the pin
 *
 * @method writePin
 * @param {Number} pin_number Number of the pin on the Galileo board.
 * @param {String} data What does the pin says ?
 */
GalileoGpio.prototype.writePin = function(pin_number, data)
{
    fs.writeFileSync(this.gpioPath + "/gpio" + this.pin[pin_number].id + "/value", data);
};

/**
 * Read data from an analog pin
 *
 * @method readAnalogPin
 * @param {Number} pin_number Number of the analog pin on the Galileo board.
 */

 //TODO: pass 'raw' in the parameters
GalileoGpio.prototype.readAnalogPin = function(pin_number)
{
    var data = fs.readFileSync("/sys/bus/iio/devices/iio:device0/in_voltage" + this.pin[pin_number].index + "_raw");
    //console.log('Reading on pin ' + this.pin[pin_number].index)
    return data;
};

// TODO: test readAnalogScalePin
GalileoGpio.prototype.readAnalogScalePin = function(pin_number)
{
    var data = fs.readFileSync("/sys/bus/iio/devices/iio:device0/in_voltage" /*+ pin_number*/ + "_scale");
    return data;
};

/**
 * Read data from a digital pin
 *
 * @method readDigitalPin
 * @param {Number} pin_number Number of the digital pin on the Galileo board.
 */

GalileoGpio.prototype.readDigitalPin = function(pin_number)
{
    var data = fs.readFileSync(this.gpioPath + "/gpio" + this.pin[pin_number].id + "/value");
    return data;
};


/**
 * Close system access to the pin
 *
 * @method closePin
 * @param {Number} pin_number Number of the pin on the Galileo board.
 */
GalileoGpio.prototype.closePin = function(pin_number)
{
    if (fs.existsSync(this.gpioPath + "/gpio" + this.pin[pin_number].id))
    {
        fs.writeFileSync(this.gpioPath + "/unexport", this.pin[pin_number].id);
    }
};

/**
 * Exports a pwm GPIO to make it reachable on the system.
 *
 * @method openPwmPin
 * @param {Number} pin_number Number of the pwm pin on the Galileo board.
 */
GalileoGpio.prototype.openPwmPin = function(pin_number)
{
    fs.writeFileSync(this.pwmPath + "/export", this.pin[pin_number].index);
};

/**
 * Activate or deactivate a pwm pin
 *
 * @method setPwmPinActivation
 * @param {Number} pin_number Number of the pwm pin on the Galileo board.
 * @param {String} activation Defines if it emits or not ("0" or "1")
 */
GalileoGpio.prototype.setPwmPinActivation = function(pin_number, activation)
{
    fs.writeFileSync(this.pwmPath + "/pwm" + this.pin[pin_number].index + "/enable", activation);
};

/**
 * Sets the pwm period in nanoseconds (i.e. how long the cycle lasts)
 *
 * @method setPwmPinPeriod
 * @param {Number} pin_number Number of the pwm pin on the Galileo board.
 * @param {Number} period Pwm period in nanoseconds.
 */
GalileoGpio.prototype.setPwmPinPeriod = function(pin_number, period)
{
    fs.writeFileSync(this.pwmPath + "/pwm" + this.pin[pin_number].index + "/period", period.toString());
    this.pin[pin_number].period = period;
};

/**
 * Sets the pwm duty cycle (i.e. how long it is activated during a cycle)
 *
 * @method setPwmPinCycle
 * @param {Number} pin_number Number of the pwm pin on the Galileo board.
 * @param {Number} cycle Pwm cycle in percentage.
 */
GalileoGpio.prototype.setPwmPinCycle = function(pin_number, cycle)
{
    var cycle_value = cycle / 100 * this.pin[pin_number].period;
    console.log(cycle_value);

    fs.writeFileSync(this.pwmPath + "/pwm" + this.pin[pin_number].index + "/duty_cycle", cycle_value.toString());
};

/**
 * Unexport a pwm GPIO.
 *
 * @method closePwmPin
 * @param {Number} pin_number Number of the pwm pin on the Galileo board.
 */
GalileoGpio.prototype.closePwmPin = function(pin_number)
{
    fs.writeFileSync(this.pwmPath + "/unexport", this.pin[pin_number].index);
    this.pin[pin_number].period = 0;
};

module.exports = new GalileoGpio;