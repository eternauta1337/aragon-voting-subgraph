import { DeployDAO as DeployDAOEvent } from '../generated/DAOFactory/DAOFactory'
import { Organization as OrganizationEntity } from '../generated/schema'
import { Kernel as KernelTemplate } from '../generated/templates'

export function handleDeployDAO(event: DeployDAOEvent): void {
  let orgAddress = event.params.dao

  let org = new OrganizationEntity(orgAddress.toHexString())

  org.address = orgAddress
  org.apps = []

  org.save()

  KernelTemplate.create(orgAddress)
}