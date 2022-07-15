import * as core from '@actions/core'
import {writeFile} from 'fs/promises'

import {pipe, map, pluck, toArray, toAsync, range, each} from '@fxts/core'

import {FormFactorList, FormFactorPreset} from './constants/FormFactor'

import parseInput from './utils/parseInput'

async function run(): Promise<void> {
  try {
    const input = parseInput()
    const {urlList} = input

    const configFileList = await pipe(
      range(0, FormFactorList.length),
      toAsync,
      map(index => {
        const formFactor = FormFactorList[index]
        const preset = FormFactorPreset[formFactor]
        preset.ci.collect.url = pipe(urlList, pluck('url'), toArray)
        return [formFactor, preset]
      }),
      map(async args => {
        const [formFactor, preset] = args
        const fileName = `.lighthouserc.${formFactor}.json`
        await writeFile(`./${fileName}`, JSON.stringify(preset), {
          encoding: 'utf8'
        })
        return [formFactor, fileName]
      }),
      toArray
    )

    each(args => {
      const [formFactor, fileName] = args
      core.setOutput(
        `${formFactor.toString().toUpperCase()}_CONFIG_FILE_NAME`,
        fileName
      )
    }, configFileList)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
