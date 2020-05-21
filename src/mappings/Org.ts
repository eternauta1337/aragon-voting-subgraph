import { DeployDAO as DeployDAOEvent } from '../../generated/DAOFactory/DAOFactory'
import { Kernel as KernelTemplate } from '../../generated/templates'
import * as params from '../params'

export function handleDeployDAO(event: DeployDAOEvent): void {
  let orgAddress = event.params.dao

  if (params.USE_ORG_WHITELIST) {
    let whitelisted = params.ORG_WHITELIST.includes(orgAddress.toHexString())

    if (!whitelisted) {
      return
    }
  }

  KernelTemplate.create(orgAddress)
}