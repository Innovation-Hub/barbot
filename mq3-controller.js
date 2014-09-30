/**
 * Crafted by Obero on 29/09/14
 * For Epitech Innovation Hub
 */

"use strict";
var galil = require('./gpio-galileo-helper');

/**
 * Mq3Controller helps you to control BarBot mq3 alcohol gaz-meter.
 *
 * @class Mq3Controller
 * @constructor
 */
var Mq3Controller = function()
{
    /**
     * Sets the pin id on which the mq3 is plugged
     * @property pin
     * @type String
     * @default 'A0'
     */
    this.pin = 'A0';

    /**
     * The mq3 base value (no alcohol detected)
     * @property base_value
     * @type Number
     * @default 0
    */
    this.base_value = 0;
};

/**
 * Helper : Gets the current mq3 value.
 *
 * @method getValue
 * @return {Number} Current mq3 value
 */
Mq3Controller.prototype.getValue = function()
{
    var value;

    galil.openPin(this.pin);
    galil.setPinDirection(this.pin, 'out');
    galil.writePin(this.pin, '0');
    value = parseInt(galil.readAnalogPin(this.pin));
    galil.closePin(this.pin);

    return value;
};

/**
 * Helper : Gets the average measure value over time
 *
 * @method getAverageValue
 * @param {Number} interval A measure is done every interval (ms)
 * @param {Number} count Number of measures to do
 * @param {Function} [callback] Callback. Average value is passed to it.
 */
Mq3Controller.prototype.getAverageValue = function(interval, count, callback)
{
    var that = this;
    var average_value = 0;

    galil.openPin(this.pin);
    galil.setPinDirection(this.pin, 'out');
    galil.writePin(this.pin, '0');

    console.log('[MQ3] Starting measurement');
    var timer = 0;
    var int_id = setInterval(function()
    {
        console.log('[MQ3] ' + (count - timer) + ' left...');
        average_value += parseInt(galil.readAnalogPin(that.pin));
        timer++;
        if (timer > count)
        {
            clearInterval(int_id);
            galil.closePin(that.pin);
            average_value = average_value / count;
            console.log('[MQ3] Measurement done');
            callback(average_value);
        }
    }, interval);
};

/**
 * Helper : Gets the average measure value over time
 *
 * @method getHigherValue
 * @param {Number} interval A measure is done every interval (ms)
 * @param {Number} count Number of measures to do
 * @param {Function} [callback] Callback. Higher value is passed to it.
 */
Mq3Controller.prototype.getHigherValue = function(interval, count, callback)
{
    var that = this;
    var higher_value = 0;

    galil.openPin(this.pin);
    galil.setPinDirection(this.pin, 'out');
    galil.writePin(this.pin, '0');

    console.log('[MQ3] Starting measurement');
    var timer = 0;
    var int_id = setInterval(function()
    {
        var current_value = parseInt(galil.readAnalogPin(that.pin));
        higher_value = (higher_value > current_value) ? higher_value : current_value;

        timer++;
        if (timer > count)
        {
            galil.closePin(that.pin);
            clearInterval(int_id);
            console.log('[MQ3] Measurement done');
            callback(higher_value);
        }
        console.log('[MQ3] ' + (count - timer) + ' left...');
    }, interval);
};

module.exports = new Mq3Controller;