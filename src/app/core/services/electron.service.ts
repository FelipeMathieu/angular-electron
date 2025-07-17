import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  public ipcRenderer!: typeof ipcRenderer;
  public webFrame!: typeof webFrame;
  public fs!: typeof fs;
  private readonly _childProcess!: typeof childProcess;

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = (window as any).require('electron').ipcRenderer;
      this.webFrame = (window as any).require('electron').webFrame;

      this.fs = (window as any).require('fs');

      this._childProcess = (window as any).require('child_process');
      this._childProcess.exec('node -v', (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout:\n${stdout}`);
      });
    }
  }

  public get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }
}
