/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { ChangeEvent, MouseEvent } from 'react';

export type { KeyboardEvent, ComponentType, ReactEventHandler } from 'react';

export declare type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export declare type ElementClickEvent<T> = MouseEvent<T>;
