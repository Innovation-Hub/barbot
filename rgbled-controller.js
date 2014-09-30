/**
 * Crafted by Obero on 30/09/14
 * For Epitech Innovation Hub
 */

"use strict";
var galil = require('./gpio-galileo-helper');

/**
 * RgbledController helps you to manipulate an RGB led.
 *
 * @class Rgbledcontroller
 * @constructor
 */
var RgbledController = function()
{
    /**
     * Sets pin ids to match it with colors
     * @property pin
     * @type {{r: number, g: number, b: number}}
     * @default {'r' : 3, 'g' : 10, 'b' : 11}
     */
    this.pin =
    {
        'r' : 3,
        'g' : 10,
        'b' : 11
    };

    /**
     * @property current
     * @type {{r: number, g: number, b: number}}
     * @default {'r' : 0, 'g' : 0, 'b' : 0}
     */
    this.current =
    {
        'r' : 0,
        'g' : 0,
        'b' : 0
    };
};

/**
 * Helper : Turns the rgb led totally off
 *
 * @method turnOff
 */
RgbledController.prototype.turnOff = function()
{
    for (var index in this.pin)
    {
        if (this.pin.hasOwnProperty(index))
        {
            var color = index.toString();

            console.log('[RGB] turning off');
            galil.openPin(this.pin[color]);
            galil.setPinDirection(this.pin[color], "out");
            galil.setPinPortDrive(this.pin[color], "strong");
            galil.writePin(this.pin[color], "0");
            galil.closePin(this.pin[color]);
        }
    }
};

/**
 * Helper : Sets the r, g, and b values for the led
 *
 * @method setRgbValues
 * @param {Array} rgb Values are either 0 or 1
 */
// TODO: use pwm to set all sorts of colors, and modulate it smoother
RgbledController.prototype.setRgbValue = function(rgb)
{
    var that = this;

    for (var index in this.pin)
    {
        if (this.pin.hasOwnProperty(index))
        {
            var color = index.toString();

            console.log('[RGB] setting ' + color + ' to ' + rgb[color]);
            galil.openPin(this.pin[color]);
            galil.setPinDirection(this.pin[color], "out");
            galil.setPinPortDrive(this.pin[color], "strong");
            if (rgb[color] == 1)
            {
                galil.writePin(this.pin[color], "1");
            }
            else
            {
                galil.writePin(this.pin[color], "0");
            }
            galil.closePin(that.pin[color]);
        }
    }
};

module.exports = new RgbledController;