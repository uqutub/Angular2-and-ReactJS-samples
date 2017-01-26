import { Component, Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class ToastService {

    constructor(private snakeBar: MdSnackBar) {

    }

    showToast(messageToShow: string) {
        this.snakeBar.open(messageToShow);
    }

}