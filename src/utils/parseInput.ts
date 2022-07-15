import {map, pipe, split, toArray} from '@fxts/core'
import {getInput, getMultilineInput} from '@actions/core'
import inputName from '../constants/InputName'

interface InputData {
  urlPrefix: string
  urlList: UrlList
}

type UrlList = UrlItem[]

interface UrlItem {
  label: string
  url: string
  path: string
  pathSlug: string
}

const parseRawInputUrlList = (
  urlPrefix: string,
  urlStringList: string[]
): UrlList =>
  pipe(
    urlStringList,
    map(str => split('__SEP__', str)),
    map(splitted => {
      const [label, path] = splitted
      const url = urlPrefix ? `${urlPrefix}${path}` : path
      return {
        label,
        path,
        pathSlug: path.replace(/\//, '_'),
        url
      }
    }),
    toArray
  )

export default function parseInput(): InputData {
  const urlPrefix = getInput(inputName.URL_PREFIX)
  const rawUrlList = getMultilineInput(inputName.URL_LIST)
  return {
    urlPrefix,
    urlList: parseRawInputUrlList(urlPrefix, rawUrlList)
  }
}
