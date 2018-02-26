<?php

/**
 * create model
 *
 * @param $class
 * @param array $attributes
 * @param null $times
 * @return mixed
 */
function create($class,array $attributes = [], $times = null)
{
    return factory($class, $times)->create($attributes);
}

/**
 * make model
 *
 * @param $class
 * @param array $attributes
 * @param null $times
 * @return mixed
 */
function make($class,array $attributes = [], $times = null)
{
    return factory($class, $times)->make($attributes);
}
