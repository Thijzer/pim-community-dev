<?php

namespace Pim\Bundle\CatalogBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Parameter;

/**
 * Resolves doctrine ORM Target entities
 *
 * @author    Antoine Guigan <antoine@akeneo.com>
 * @copyright 2013 Akeneo SAS (http://www.akeneo.com)
 * @license   http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */
abstract class AbstractResolveDoctrineOrmTargetEntitiesPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        $this->resolveTargetEntities($container);

        $this->resolveTargetDocuments($container);
    }

    /**
     * Resolve target entity interfaces by using container parameters
     *
     * @param ContainerBuilder $container
     */
    protected function resolveTargetEntities(ContainerBuilder $container)
    {
        $definition = $container->findDefinition('doctrine.orm.listeners.resolve_target_entity');
        foreach ($this->getParametersMapping() as $interface => $parameterName) {
            $definition->addMethodCall(
                'addResolveTargetEntity',
                array(
                    $interface,
                    new Parameter($parameterName),
                    array()
                )
            );
        }
    }

    /**
     * Resolve target document interfaces by using container parameters
     *
     * @param ContainerBuilder $container
     */
    protected function resolveTargetDocuments(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('doctrine_mongodb.odm.listeners.resolve_target_document')) {
            return;
        }
        $definition = $container->findDefinition('doctrine_mongodb.odm.listeners.resolve_target_document');

        foreach ($this->getParametersMapping() as $interface => $parameterName) {
            $definition->addMethodCall(
                'addResolveTargetDocument',
                array(
                    $interface,
                    new Parameter($parameterName),
                    array()
                )
            );
        }
    }

    /**
     * Returns the parameter mappings
     *
     * @return array
     */
    abstract protected function getParametersMapping();
}
