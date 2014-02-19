/**
 * Created by obero on 2/18/14.
 * For Epitech Innovation Hub
 */

"use strict";
var galil = require('./gpio-galileo-helper');

/**
 * PumpController helps you to control BarBot pumps.
 *
 * @class PumpController
 * @constructor
 */
var PumpController = function()
{
    /**
     * Helps you to work directly on a given pump with its index,
     * mapping its index to the matching IO pin.
     * @property pump
     * @type Object
     */
    this.pump =
    {
        7:  7,
        8:  8
    };
    /**
     * Pump states helper
     * @property state
     * @property Object
     */
    this.state =
    {
        'ON':   "1",
        'OFF':  "0"
    };
};

PumpController.prototype.setPumpMap = function(pump_map)
{
    this.pump = pump_map;
};

/**
 * Helper : let you command some pump asynchronously.
 *
 * @method drainIndex
 * @param {Number} pump_index Number of the pump as set in `pump`.
 * @param {Number} delay Time (ms) of pumping
 * @param {Function} [callback] Callback... Called immediately.
 */
PumpController.prototype.drainIndex = function(pump_index, delay, callback)
{
    var that = this;

    galil.openPin(this.pump[pump_index]);
    galil.setPinDirection(this.pump[pump_index], "out");
    galil.setPinPortDrive(this.pump[pump_index], "strong");
    galil.writePin(this.pump[pump_index], this.state['ON']);
    console.log('PIN' + this.pump[pump_index] + ': ON.');

    setTimeout(function()
    {
        galil.writePin(that.pump[pump_index], that.state['OFF']);
        console.log('PIN' + that.pump[pump_index] + ': OFF.');
        galil.closePin(that.pump[pump_index]);
    }, delay);

    if (callback && typeof callback === "function")
        callback();
};

/**
 * Helper : let you command some pump synchronously.
 *
 * @method drainIndexSync
 * @param {Number} pump_index Number of the pump as set in `pump`.
 * @param {Number} delay Time (ms) of pumping
 * @param {Function} [callback] Callback... Called after the delay.
 */
PumpController.prototype.drainIndexSync = function(pump_index, delay, callback)
{
    var that = this;

    galil.openPin(this.pump[pump_index]);
    galil.setPinDirection(this.pump[pump_index], "out");
    galil.setPinPortDrive(this.pump[pump_index], "strong");
    galil.writePin(this.pump[pump_index], this.state['ON']);
    console.log('PIN' + this.pump[pump_index] + ': ON.');

    setTimeout(function()
    {
        galil.writePin(that.pump[pump_index], that.state['OFF']);
        console.log('PIN' + that.pump[pump_index] + ': OFF.');
        galil.closePin(that.pump[pump_index]);

        if (callback && typeof callback === "function")
            callback();
    }, delay);
};

module.exports = new PumpController;
