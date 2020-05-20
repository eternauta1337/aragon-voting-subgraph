import { log } from '@graphprotocol/graph-ts'
import { NewAppProxy as NewAppProxyEvent } from '../generated/templates/Kernel/Kernel'
import { DeployDAO as DeployDAOEvent } from '../generated/DAOFactory/DAOFactory'
import { Kernel as KernelTemplate } from '../generated/templates'

const APP_ID = '0x9fa3927f639745e587912d4b0fea7ef9013bf93fb907d29faeab57417ba6e1d4'

export function handleNewAppProxy(event: NewAppProxyEvent): void {
  if (event.params.appId.toHexString() == APP_ID) {
    log.info('Found voting app {}', [event.params.appId.toHexString()])
  }
}

export function handleDeployDAO(event: DeployDAOEvent): void {
  KernelTemplate.create(event.params.dao)
}