import {test} from '@jest/globals'

test('empty', () => {})


/*
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_URL_PREFIX'] = 'http://localhost:3000'
  process.env['INPUT_URL_LIST'] =
    '[상품상세] 싱글 콘텐츠__SEP__/goods/5063942\n[상품상세] 멀티 콘텐츠__SEP__/goods/5094163\n[상품상세] 옵션형 콘텐츠__SEP__/goods/1000001181'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  // console.log(cp.execFileSync(np, [ip], options).toString())
})
*/