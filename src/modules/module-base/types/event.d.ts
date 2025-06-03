/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ChangeEvent, MouseEvent } from 'react';

export type { KeyboardEvent, ComponentType, ReactEventHandler } from 'react';

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export type ElementClickEvent<T> = MouseEvent<T>;
