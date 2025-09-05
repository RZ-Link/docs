---
outline: deep
---

# heat-templates

## 创建一个网络，两个实例
```yaml
heat_template_version: 2015-04-30

description: 创建一个网络，两个实例

resources:

  # 创建网络
  vxlan_network_1:
    type: OS::Neutron::Net
    properties:
      name: vxlan_network_1

  # 创建子网
  vxlan_subnet_1:
    type: OS::Neutron::Subnet
    properties:
      cidr: 30.10.0.0/24
      enable_dhcp: true
      gateway_ip: 30.10.0.1
      name: vxlan_subnet_1
      network: { get_resource: vxlan_network_1 }

  # 创建端口
  vxlan_subnet_1_port_1:
    type: OS::Neutron::Port
    properties:
      fixed_ips:
        - subnet: { get_resource: vxlan_subnet_1 }
          ip_address: 30.10.0.10
      name: vxlan_subnet_1_port_1
      network: { get_resource: vxlan_network_1 }
      port_security_enabled: false

  # 创建端口
  vxlan_subnet_1_port_2:
    type: OS::Neutron::Port
    properties:
      fixed_ips:
        - subnet: { get_resource: vxlan_subnet_1 }
          ip_address: 30.10.0.20
      name: vxlan_subnet_1_port_2
      network: { get_resource: vxlan_network_1 }
      port_security_enabled: false

  # 创建实例
  cirros_101:
    type: OS::Nova::Server
    properties:
      # 镜像名称
      image: cirros-0.6.2
      # 实例类型名称
      flavor: instance_1c1g
      # 实例名称
      name: cirros_101
      # 网络端口
      networks:
        - port: { get_resource: vxlan_subnet_1_port_1 }

  # 创建实例
  cirros_102:
    type: OS::Nova::Server
    properties:
      # 镜像名称
      image: cirros-0.6.2
      # 实例类型名称
      flavor: instance_1c1g
      # 实例名称
      name: cirros_102
      # 网络端口
      networks:
        - port: { get_resource: vxlan_subnet_1_port_2 }

```

## 创建两个网络，使用路由连接两个网络
```yaml
heat_template_version: 2015-04-30

description: 创建两个网络，使用路由连接两个网络

resources:

  # 创建网络
  vxlan_network_1:
    type: OS::Neutron::Net
    properties:
      name: vxlan_network_1
  # 创建子网1
  vxlan_subnet_1:
    type: OS::Neutron::Subnet
    properties:
      cidr: 30.10.0.0/24
      enable_dhcp: true
      gateway_ip: 30.10.0.7
      name: vxlan_subnet_1
      network: { get_resource: vxlan_network_1 }
  # 创建端口
  vxlan_subnet_1_port:
    type: OS::Neutron::Port
    properties:
      fixed_ips:
        - subnet: { get_resource: vxlan_subnet_1 }
          ip_address: 30.10.0.10
      name: vxlan_subnet_1_port
      network: { get_resource: vxlan_network_1 }
      port_security_enabled: false
  # 创建实例
  cirros_101:
    type: OS::Nova::Server
    properties:
      # 镜像名称
      image: cirros-0.6.2
      # 实例类型名称
      flavor: instance_1c1g
      # 实例名称
      name: cirros_101
      # 网络端口
      networks:
        - port: { get_resource: vxlan_subnet_1_port }

  # 创建网络
  vxlan_network_2:
    type: OS::Neutron::Net
    properties:
      name: vxlan_network_2
  # 创建子网2
  vxlan_subnet_2:
    type: OS::Neutron::Subnet
    properties:
      cidr: 30.20.0.0/24
      enable_dhcp: true
      gateway_ip: 30.20.0.7
      name: vxlan_subnet_2
      network: { get_resource: vxlan_network_2 }
  # 创建端口
  vxlan_subnet_2_port:
    type: OS::Neutron::Port
    properties:
      fixed_ips:
        - subnet: { get_resource: vxlan_subnet_2 }
          ip_address: 30.20.0.10
      name: vxlan_subnet_2_port
      network: { get_resource: vxlan_network_2 }
      port_security_enabled: false
  # 创建实例
  cirros_102:
    type: OS::Nova::Server
    properties:
      # 镜像名称
      image: cirros-0.6.2
      # 实例类型名称
      flavor: instance_1c1g
      # 实例名称
      name: cirros_102
      # 网络端口
      networks:
        - port: { get_resource: vxlan_subnet_2_port }

  # 创建路由
  router:
    type: OS::Neutron::Router
    properties:
      name: router
  # 创建子网1路由接口，接口port没有指定，默认使用子网1网关ip
  vxlan_subnet_1_router_interface:
    type: OS::Neutron::RouterInterface
    properties:
      router_id: { get_resource: router }
      subnet: { get_resource: vxlan_subnet_1 }
  # 创建子网2路由接口，接口port没有指定，默认使用子网2网关ip
  vxlan_subnet_2_router_interface:
    type: OS::Neutron::RouterInterface
    properties:
      router_id: { get_resource: router }
      subnet: { get_resource: vxlan_subnet_2 }

```
