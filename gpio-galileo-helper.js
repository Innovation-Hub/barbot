/**
 * Crafted by Obero on 02/14/14
 * For Epitech Innovation Hub
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
        3: "18",
        4: "28",
        5: "17",
        7: "27",
        8: "26"
    };
    /**
     * GPIO system path
     * @property gpioPath
     * @type Object
     */
    this.gpioPath = "/sys/class/gpio";
};

GalileoGpio.prototype.openGPIO = function()
{
    //TODO: direct use of GPIO number
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
    fs.writeFileSync(this.gpioPath + "/export", this.pin[pin_number]);
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
    fs.writeFileSync(this.gpioPath + "/gpio" + this.pin[pin_number] + "/direction", direction);
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
    fs.writeFileSync(this.gpioPath + "/gpio" + this.pin[pin_number] + "/drive", config_type);
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
    fs.writeFileSync(this.gpioPath + "/gpio" + this.pin[pin_number] + "/value", data);
};

/**
 * Close system access to the pin
 *
 * @method closePin
 * @param {Number} pin_number Number of the pin on the Galileo board.
 */
GalileoGpio.prototype.closePin = function(pin_number)
{
    fs.writeFileSync(this.gpioPath + "/unexport", this.pin[pin_number]);
};

module.exports = new GalileoGpio;
